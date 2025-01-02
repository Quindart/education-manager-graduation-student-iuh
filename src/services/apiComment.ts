import { ResponseType } from '@/types/axios.type';
import axiosConfig from './axiosConfig';
const URL = '/api/v1/comments';

export const getCommentById = async (
  termId: string,
  type: string,
  groupStudentId: string,
): Promise<ResponseType> => {
  return await axiosConfig.get(
    `${URL}/type?termId=${termId}&type=${type}&groupStudentId=${groupStudentId}`,
  );
};

// [LECTURER] Create Comment(done)
export const createComment = async (
  termId: string,
  type: string,
  groupStudentId: string,
  content: string,
): Promise<ResponseType> => {
  return await axiosConfig.post(`${URL}`, {
    type: type,
    groupStudentId: groupStudentId,
    termId: termId,
    content: content,
  });
};

// [LECTURER] Update Comment
export const updateComment = async (id: string, content: string): Promise<ResponseType> => {
  return await axiosConfig.put(`${URL}/${id}`, {
    content: content,
  });
};
