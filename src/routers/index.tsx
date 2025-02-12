import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRouter from './privateRouter';
import { APP_ROUTES } from '@/utils/app-config';
import { lazy } from 'react';
import AuthLayout from '@/components/shared/layouts/AuthLayout/AuthLayout';
import RolePage from '@/page/auth/role';
import Login from '@/page/auth/login';
import DetailNotificationPage from '@/page/DetailNotification';
import NotFoundPage from '@/page/404';
import ForgotPassword from '@/page/auth/forgot';
import GuidePage from '@/page/Guide';
import Toolconvert from '@/page/tool';
import TranscriptOfAllStudents from '@/page/TranscriptOfAllStudents';
const DetailGroupSupportPage = lazy(() => import('@/page/DetailGroupSupport'));
const DashboardTemplate = lazy(() => import('@/page/Dashboard'));
const TermTemplate = lazy(() => import('@/page/Term'));
const StudentTemplate = lazy(() => import('@/page/Student'));
const TopicTemplate = lazy(() => import('@/page/Topic'));
const ReviewManagerTemplate = lazy(() => import('@/page/ReviewManager'));
const LecturerManagementTemplate = lazy(() => import('@/page/Lecturer/Management'));
// const DetailsLecturerTemplate = lazy(() => import('@/page/Lecturer/Details'));
const DetailLecturerTermTemplate = lazy(() => import('@/page/LecturerTerm/Details'));

const GroupStudentManagementTemplate = lazy(() => import('@/page/GroupStudent/Management'));
const GroupStudentDetailTemplate = lazy(() => import('@/page/GroupStudent/Detail'));
const ScoreStudentTemplate = lazy(() => import('@/page/ScoreStudent'));
const GroupSupportManagementTemplate = lazy(() => import('@/page/GroupSupport/Management'));
const CreateGroupLecturerTemplate = lazy(() => import('@/page/GroupLecturer/Create'));
const UpdatePassPage = lazy(() => import('@/page/auth/updatePassword'));
const CreateNotificationPage = lazy(() => import('@/page/Notification/Create'));
const CreateNotifyByLecturer = lazy(() => import('@/page/Notification/CreateNotifyByLecturer'));
const ProfileTemplate = lazy(() => import('@/page/auth/profile'));
const MyTopicTemplate = lazy(() => import('@/page/MyTopic'));
const MyGroupLecturerTemplate = lazy(() => import('@/page/MyGroupLecturer'));
const GroupLecturerManagementTemplate = lazy(() => import('@/page/GroupLecturer/Management'));
const GroupLecturerDetailTemplate = lazy(() => import('@/page/GroupLecturer/Detail'));
const MajorTemplate = lazy(() => import('@/page/Major'));
const MyDetailGroupLecturerTemplate = lazy(() => import('@/page/MyGroupLecturer/Detail'));
const NotificationManagementTemplate = lazy(() => import('@/page/Notification/Management'));
const RolePermissionTemplate = lazy(() => import('@/page/RolePermission'));
const RoleDetailTemplate = lazy(() => import('@/page/RolePermission/Detail/RoleDetailPage'));
const LecturerTermManagementTemplate = lazy(() => import('@/page/LecturerTerm/Management'));
const AnalysisTemplate = lazy(() => import('@/page/Analysis'));
const ArticleTemplate = lazy(() => import('@/page/Article/Management'));
const FinalReportTemplate = lazy(() => import('@/page/FinalReport/Management'));
const ScoreManagementExcel = lazy(() => import('@/page/ScoreManagementExcel'));
const MyScoringPage = lazy(() => import('@/page/MyScoring'));

function Routing() {
  return (
    <Routes>
      <Route path='/' element={<PrivateRouter />}>
        //ROUTE HOME
        <Route index path={APP_ROUTES.DASHBOARD} element={<DashboardTemplate />} />
        //ROUTE MAJOR
        <Route path={APP_ROUTES.MAJOR.MANAGEMENT} element={<MajorTemplate />} />
        //ROUTE TERM
        <Route path={APP_ROUTES.TERM.MANAGEMENT} element={<TermTemplate />} />
        //ROUTE ANALYSIS
        <Route path={APP_ROUTES.ANALYSIS.MANAGEMENT} element={<AnalysisTemplate />} />
        //ROUTE ARTICLE
        <Route path={APP_ROUTES.ARTICLE.MANAGEMENT} element={<ArticleTemplate />} />
        //ROUTE ARTICLE
        <Route path={APP_ROUTES.FINAL_REPORT.MANAGEMENT} element={<FinalReportTemplate />} />
        //ROUTE LECTURER
        <Route path={APP_ROUTES.LECTURER.MANAGEMENT} element={<LecturerManagementTemplate />} />
        {/* <Route path={APP_ROUTES.LECTURER.DETAILS} element={<DetailsLecturerTemplate />} /> */}
        <Route
          path={APP_ROUTES.LECTURER_TERM.MANAGEMENT}
          element={<LecturerTermManagementTemplate />}
        />
        <Route path={APP_ROUTES.LECTURER_TERM.DETAILS} element={<DetailLecturerTermTemplate />} />
        //ROUTE STUDENT
        <Route path={APP_ROUTES.STUDENT.MANAGEMENT} element={<StudentTemplate />} />
        //ROUTE USER
        <Route path={APP_ROUTES.USER.MANAGEMENT} element={<h1>user</h1>} />
        //ROUTE TOPIC
        <Route path={APP_ROUTES.TOPIC.MANAGEMENT} element={<TopicTemplate />} />
        <Route path={APP_ROUTES.TOPIC.LECTURER} element={<MyTopicTemplate />} />
        //ROUTE REVIEW
        <Route path={APP_ROUTES.REVIEW.MANAGEMENT} element={<ReviewManagerTemplate />} />
        //ROUTE GR_STUDENT
        {/* <Route path={APP_ROUTES.GROUP_STUDENT.MANAGEMENT} element={<GroupStudentTemplate />} /> */}
        <Route
          path={APP_ROUTES.GROUP_STUDENT.MANAGEMENT}
          element={<GroupStudentManagementTemplate />}
        />
        <Route path={APP_ROUTES.GROUP_STUDENT.DETAIL} element={<GroupStudentDetailTemplate />} />
        //ROUTE GR_SUPPORT
        <Route
          path={APP_ROUTES.GROUP_SUPPORT.MANAGEMENT}
          element={<GroupSupportManagementTemplate />}
        />
        <Route path={APP_ROUTES.GROUP_SUPPORT.DETAIL} element={<DetailGroupSupportPage />} />
        {/* <Route path={APP_ROUTES.GROUP_SUPPORT.SCORE} element={<ScoreGroupSupportTemplate />} /> */}
        {/* <Route path={APP_ROUTES.GROUP_SUPPORT.DETAIL_SCORE_GROUP} element={<GroupSupportManagementTemplate />} /> */}
        //ROUTE USER
        <Route path={APP_ROUTES.USER.PROFILE} element={<ProfileTemplate />} />
        <Route path={APP_ROUTES.USER.UPDATE_PASS} element={<UpdatePassPage />} />
        //ROLE PERMISSION
        <Route
          path={APP_ROUTES.USER_AUTHORIZATION.MANAGEMENT}
          element={<RolePermissionTemplate />}
        />
        <Route path={APP_ROUTES.USER_AUTHORIZATION.DETAIL} element={<RoleDetailTemplate />} />
        //ROUTE GR_LECTURER
        <Route
          path={APP_ROUTES.GROUP_LECTURER.MANAGEMENT}
          element={<GroupLecturerManagementTemplate />}
        />
        <Route path={APP_ROUTES.GROUP_LECTURER.ME} element={<MyGroupLecturerTemplate />} />
        <Route path={APP_ROUTES.GROUP_LECTURER.CREATE} element={<CreateGroupLecturerTemplate />} />
        <Route path={APP_ROUTES.GROUP_LECTURER.DETAIL} element={<GroupLecturerDetailTemplate />} />
        <Route
          path={APP_ROUTES.GROUP_LECTURER.MY_DETAIL_GROUP}
          element={<MyDetailGroupLecturerTemplate />}
        />
        //Notification
        <Route
          path={APP_ROUTES.NOTIFICATION.MANAGEMENT}
          element={<NotificationManagementTemplate />}
        />
        <Route path={APP_ROUTES.NOTIFICATION.CREATE} element={<CreateNotificationPage />} />
        //Notification by lecturer
        <Route
          path={APP_ROUTES.NOTIFICATION.MANAGEMENT_LECTURER}
          element={<NotificationManagementTemplate />}
        />
        <Route
          path={APP_ROUTES.NOTIFICATION.CREATE_BY_LECTURER}
          element={<CreateNotifyByLecturer />}
        />
        <Route path={APP_ROUTES.NOTIFICATION.DETAILS} element={<DetailNotificationPage />} />
        //ROUTE SCORE_STUDENT
        <Route path={APP_ROUTES.SCORE_STUDENT.MANAGEMENT} element={<MyScoringPage />} />
        //ROUTE SCORE MANAGEMENT ALL STUDENTS
        <Route path={APP_ROUTES.ALL_TRANSCRIPTS.MANAGEMENT} element={<TranscriptOfAllStudents />} />
        {/* <Route
          path={APP_ROUTES.SCORE_STUDENT.MANAGEMENT_EXCEL}
          element={<ScoreManagementExcel />}
        /> */}
      </Route>

      <Route path='/auth' element={<AuthLayout />}>
        <Route index path={APP_ROUTES.ROLE.ALL} element={<RolePage />} />
        <Route index path={APP_ROUTES.USER.LOGIN} element={<Login />} />
        <Route path={APP_ROUTES.USER.FORGOT} element={<ForgotPassword />} />
      </Route>
      <Route path={APP_ROUTES.TOOL} element={<Toolconvert />} />

      <Route path={APP_ROUTES.GUIDE} element={<GuidePage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
}

export default Routing;
