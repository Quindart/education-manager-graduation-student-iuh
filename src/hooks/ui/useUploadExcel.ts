import { queryClient } from '@/providers/ReactQueryClientProvider';
import axiosConfig from '@/services/axiosConfig';
import { getValueFromLocalStorage } from '@/utils/localStorage';
import axios, { AxiosProgressEvent } from 'axios';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { QueryKeysLecturer } from '../api/useQueryLecturer';
import { QueryEvaluation } from '../api/useQueryEvalutaion';
import { QueryStudent } from '../api/useQueryStudent';
import { QueryTopic } from '../api/useQueryTopic';
import { User } from '@/types/entities/user';
import { env } from '@/utils/env';
import { bytesForHuman } from '@/utils/file';
const EXTENSIONS = ['xlsx', 'xls', 'csv'];

export enum TypeEntityUpload {
  STUDENT = 'students',
  LECTURER = 'lecturers',
  TOPIC = 'topics',
  EVALUATION = 'evaluations',
}

const axiosUpload = axios.create({
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

//TODO [MIDDLEWARE]
axiosUpload.interceptors.request.use(
  (config) => {
    const accessToken = getValueFromLocalStorage('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosUpload.interceptors.response.use(
  (response: any) => {
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.data.status === 401 && error.response.data.success === false) {
      originalRequest._retry = true;
      try {
        const refreshToken = getValueFromLocalStorage('refreshToken');
        const result: any = await axiosConfig.post('/api/v1/lecturers/refresh-token', {
          refreshToken,
        });
        localStorage.setItem('accessToken', JSON.stringify(result.accessToken));
        originalRequest.headers.Authorization = `Bearer ${result.accessToken}`;
        return axiosConfig(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error.response.data);
  },
);
//TODO [MIDDLEWARE]

interface UploadHandler {
  entityUpload: string;
  termId: string;
  majorId: string;
  me: User;
  typeEvaluation?: string;
  handleCloseUpload?: () => void;
}
const useUploadExcel = (props: UploadHandler) => {
  const { entityUpload, termId, majorId, me, typeEvaluation, handleCloseUpload } = props;

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fileName, setFileName] = useState<string>('');
  const [totalSize, setTotalSize] = useState<string>('');
  const [currentFile, setCurrentFile] = useState();
  const { enqueueSnackbar } = useSnackbar();

  //axios
  const [valueLoading, setValueLoading] = useState<any>(0);
  const getExention = (file: any) => {
    const parts = file.name.split('.');
    const extension = parts[parts.length - 1];
    return EXTENSIONS.includes(extension);
  };

  //TODO  [IMPORT DATA FROM EXCEL FILE]
  const importExcel = async (e: any) => {
    //read file
    const file = e.target.files[0];
    setFileName(file.name);
    setTotalSize(bytesForHuman(file.size));
    const reader = new FileReader();
    setSuccess(false);
    setLoading(true);

    //validate file
    if (!file) {
      return enqueueSnackbar('Đã có lỗi khi tải lên, vui lòng thử lại sau...', {
        variant: 'error',
      });
    }
    if (!getExention(file)) {
      return enqueueSnackbar('File tải lên không đúng định dạng Excel, CSV file', {
        variant: 'error',
      });
    }
    setCurrentFile(file);
    reader.readAsBinaryString(file);
  };

  //saved file
  const savedFileToDatabase = async (file: any) => {
    const bodyWithOtherEntity = {
      file: file,
      termId: termId,
      majorId: majorId,
    };
    const bodyWithEvaluation = {
      termId: termId,
      file: file,
      type: typeEvaluation,
    };
    return axiosUpload
      .post(
        `${env.API_URL}/api/v1/${entityUpload}/import`,
        entityUpload !== TypeEntityUpload.EVALUATION ? bodyWithOtherEntity : bodyWithEvaluation,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent: AxiosProgressEvent) => {
            setValueLoading(progressEvent.progress);
          },
        },
      )
      .then(async function (response: any) {
        if (response.success) {
          if (entityUpload === TypeEntityUpload.LECTURER) {
            enqueueSnackbar('Lưu danh sách giảng viên từ excel file thành công', {
              variant: 'success',
            });
            queryClient.invalidateQueries(QueryKeysLecturer.getAllLecturer);
            handleCloseUpload();
          }
          if (entityUpload === TypeEntityUpload.EVALUATION) {
            enqueueSnackbar('Lưu danh sách tiêu chí từ excel file thành công', {
              variant: 'success',
            });
            queryClient.invalidateQueries(QueryEvaluation.getEvaluationByType);
            handleCloseUpload();
          }
          if (entityUpload === TypeEntityUpload.STUDENT) {
            enqueueSnackbar('Lưu danh sách sinh viên từ excel file thành công', {
              variant: 'success',
            });
            queryClient.invalidateQueries(QueryStudent.getAllStudent);
            queryClient.invalidateQueries(QueryStudent.managerActionStudent);
            queryClient.invalidateQueries(QueryStudent.getSearchStudentBasic);
            queryClient.invalidateQueries(QueryStudent.getCountOfStudent);
            handleCloseUpload();
          }
          if (entityUpload === TypeEntityUpload.TOPIC) {
            enqueueSnackbar('Lưu danh sách Đề tài từ excel file thành công', {
              variant: 'success',
            });
            queryClient.invalidateQueries(QueryTopic.getSearchTopic);
            queryClient.invalidateQueries(QueryTopic.getTopicsByMe);
            queryClient.invalidateQueries(QueryTopic.getCountOfTopic);
            handleCloseUpload();
          }
        }
      })

      .catch(function (error) {
        enqueueSnackbar(error.message, {
          variant: 'error',
        });
      });
  };
  return {
    importExcel,
    setFileName,
    setTotalSize,
    setCurrentFile,
    setValueLoading,
    savedFileToDatabase,
    currentFile,
    success,
    loading,
    fileName,
    valueLoading,
    totalSize,
  };
};
export default useUploadExcel;
