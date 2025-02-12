import { Topic, TopicBodyRequestType } from '@/types/entities/topic';
import axiosConfig from './axiosConfig';
import { ResponseType } from '@/types/axios.type';

const URL = '/api/v1/topics';

//[GET] GET KEYSWORDS
export const getKeywords: any = (termId: string) => {
  return axiosConfig.get(`${URL}/keywords?termId=${termId}`);
};

//[GET] COUNT HEAD_LECTURER
export const getCountOfTopic: any = (termId: string) => {
  return axiosConfig.get(`${URL}/count?termId=${termId}`);
};
//[GET] COUNT LECTURER
export const getCountOfTopicByLecturer: any = (termId: string) => {
  return axiosConfig.get(`${URL}/count-by-lecturer?termId=${termId}`);
};
//[HEAD LEC, LEC]
export const getTopicById = async (topicId: string) => {
  return axiosConfig.get<ResponseType, any>(`${URL}/${topicId}`);
};
export const getTopicsByGroupLecturerAssigned = async (groupId: string) => {
  return axiosConfig.get<ResponseType, any>(`${URL}/group-lecturer/${groupId}/${groupId}`);
};
export const assignTopic = async (id: string, topicId: string) => {
  return axiosConfig.post(`/api/v1/group-students/${id}/assign-topic`, { topicId: topicId });
};

export const searchTopics = async (
  termId: string,
  searchField: string,
  keywords: string,
  sort: string,
  limit: number | string,
  page: number | string,
) => {
  let searchFieldSend = searchField ? searchField : 'lecturerName';
  let keywordSend = keywords ? keywords : '';
  let sortSend = sort ? sort : 'ASC';
  return axiosConfig.get<ResponseType, any>(
    `${URL}/query?termId=${termId}&keywords=${keywordSend}&searchField=${searchFieldSend}&limit=${limit}&page=${page}&sort=${sortSend}`,
  );
};
//[HEAD LEC]
export const getTopicsByTermByMajor = async (termId: string) => {
  return axiosConfig.get<ResponseType, any>(`${URL}?termId=${termId}`);
};
export const getTopicsExport = async (termId: string) => {
  return axiosConfig.get<ResponseType, any>(`${URL}/export?termId=${termId}`);
};
export const getTopicsExportByLecturer = async (termId: string) => {
  return axiosConfig.get<ResponseType, any>(`${URL}/export-me?termId=${termId}`);
};

export const updateAllQuantityGroupMax = async (termId: string, quantityGroupMax: number) => {
  return axiosConfig.put<ResponseType, any>(`${URL}/quantity-group-max?termId=${termId}`, {
    quantityGroupMax: quantityGroupMax,
  });
};

//[HEAD LEC, LEC]
export const getTopicsByLecturerByTerm = async (lecturerId: string, termId: string) => {
  return axiosConfig.get<ResponseType, any>(`${URL}/lecturer/${lecturerId}?termId=${termId}`);
};

//POST [HEAD LEC, LEC]
export const createTopicByToken = async (topic: TopicBodyRequestType, termId: string) => {
  return axiosConfig.post<ResponseType, any>(`${URL}?termId=${termId}`, topic);
};

//PUT [HEAD LEC, LEC]
export const updateTopicById = async (topicId: string, topic: TopicBodyRequestType) => {
  return axiosConfig.put<ResponseType, any>(`${URL}/${topicId}`, topic);
};

//PUT [HEAD LEC, LEC]
export const updateQuantityGroupMax = async (topicId: string, topic: TopicBodyRequestType) => {
  return axiosConfig.put<ResponseType, any>(`${URL}/${topicId}`, topic);
};
//PUT  [HEAD LEC]
export const updateStatusTopicById = async (
  topicId: string,
  data: Pick<Topic, 'status' | 'note'>,
) => {
  return axiosConfig.put<ResponseType, any>(`${URL}/${topicId}/status`, data);
};

//DELETE  [HEAD LEC, LEC]
export const deleteTopicById = async (topicId: string) => {
  return axiosConfig.delete<ResponseType, any>(`${URL}/${topicId}`);
};
