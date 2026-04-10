import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import ScrollToTop from '../hooks/ScrollToTop/useScrollToTop.jsx'
import InstructorLayout from '../layouts/InstructorLayout/InstructorLayout.jsx'
import UserLayout from '../layouts/UserLayout/UserLayout.jsx'

import Home from '../pages/Home/Home.jsx'
import UserProfile from '../pages/UserProfile/UserProfile.jsx'

import DrivingLicense from '../pages/DrivingLicense/DrivingLicense.jsx'
import ChapterLesson from '../pages/DrivingLicense/ChapterLesson/ChapterLesson.jsx'
import LearningLesson from '../pages/DrivingLicense/LearningLesson/LearningLesson.jsx'
import LessonQuiz from '../pages/DrivingLicense/LessonQuiz/LessonQuiz.jsx'

import SimulationIntroduction from '../pages/SimulationScenario/SimulationIntroduction.jsx'
import SimulationScenario from '../pages/SimulationScenario/SimulationScenario.jsx'

import Forum from '../pages/Forum/Forum.jsx'

import Learning from '../pages/Learning/Learning.jsx'
import TheoryQuestion from '../pages/Learning/TheoryQuestion/TheoryQuestion.jsx'
import QuestionFlashcard from '../pages/Learning/QuestionFlashcard/QuestionFlashcard.jsx'
import ListTrafficSign from '../pages/Learning/ListTrafficSign/ListTrafficSign.jsx'
import TrafficSignDetail from '../pages/Learning/ListTrafficSign/TrafficSignDetail.jsx'
import TrafficSignFlashcard from '../pages/Learning/TrafficSignFlashcard/TrafficSignFlashcard.jsx'
import TrafficSignFlipBook from '../pages/Learning/TrafficSignFlipBook/TrafficSignFlipBook.jsx'
import ListExam from '../pages/Learning/QuestionExam/ListExam.jsx'
import ExamDetail from '../pages/Learning/QuestionExam/ExamDetail/ExamDetail.jsx'
import QuestionExam from '../pages/Learning/QuestionExam/QuestionExam.jsx'

import ExcelMultiSheetViewer from '../pages/ReadExcelData/ExcelMultiSheetViewer.jsx'

import CarScene from '../pages/ThreeScene/CarScene.jsx'
import ThreeScene from '../pages/ThreeScene/ThreeScene.jsx'

import Require from './Require.jsx'
import AdminLayout from '../layouts/AdminLayout/AdminLayout.jsx'
import AdminDashboard from '../pages/AdminPages/AdminDashboard/AdminDashboard.jsx'
import AdminFeaturePlaceholder from '../pages/AdminPages/AdminFeaturePlaceholder/AdminFeaturePlaceholder.jsx'
import AdminPendingPosts from '../pages/AdminPages/PendingPosts/PendingPosts.jsx'
import AdminCommunityReports from '../pages/AdminPages/CommunityReports/CommunityReports.jsx'
import AdminChangeRequests from '../pages/AdminPages/ChangeRequests/ChangeRequests.jsx'
import AdminUserManagement from '../pages/AdminPages/UserManagement/UserManagement.jsx'
import AdminSystemConfig from '../pages/AdminPages/SystemConfig/SystemConfig.jsx'
import AdminScoringRules from '../pages/AdminPages/ScoringRules/ScoringRules.jsx'
import AdminCategoriesHub from '../pages/AdminPages/Categories/CategoriesHub.jsx'
import AdminGenerateReports from '../pages/AdminPages/GenerateReports/GenerateReports.jsx'
import AdminNotifications from '../pages/AdminPages/Notifications/Notifications.jsx'
import AdminProfile from '../pages/AdminPages/Profile/Profile.jsx'

import BoxChat from '../components/BoxChat/BoxChat.jsx'

/* Instructor CMS Pages */
import InsDashboard from '../pages/InstructorPages/Dashboard/Dashboard.jsx'
import InsQuestionBank from '../pages/InstructorPages/QuestionBank/QuestionBank.jsx'
import InsQuestionDetail from '../pages/InstructorPages/QuestionBank/QuestionDetail.jsx'
import InsLessonMgmt from '../pages/InstructorPages/LessonManagement/LessonManagement.jsx'
import InsChapterMgmt from '../pages/InstructorPages/ChapterManagement/ChapterManagement.jsx'
import InsLicenseMgmt from '../pages/InstructorPages/LicenseManagement/LicenseManagement.jsx'
import InsVehicleMgmt from '../pages/InstructorPages/VehicleManagement/VehicleManagement.jsx'
import InsTrafficSignBank from '../pages/InstructorPages/TrafficSignBank/TrafficSignBank.jsx'
import InsSimulationBank from '../pages/InstructorPages/SimulationBank/SimulationBank.jsx'
import InsExamMgmt from '../pages/InstructorPages/ExamManagement/ExamManagement.jsx'
import InsPendingPosts from '../pages/InstructorPages/PendingPosts/PendingPosts.jsx'
import InsPosts from '../pages/InstructorPages/Posts/Posts.jsx'
import InsCommunityReports from '../pages/InstructorPages/CommunityReports/CommunityReports.jsx'
import InsContentErrorReports from '../pages/InstructorPages/ContentErrorReports/ContentErrorReports.jsx'
import InsChangeRequests from '../pages/InstructorPages/ChangeRequests/ChangeRequests.jsx'
import InsReportProcessing from '../pages/InstructorPages/ReportProcessing/ReportProcessing.jsx'
import InsSimulationExamMgmt from '../pages/InstructorPages/SimulationExamManagement/SimulationExamManagement.jsx'
import InsReportEntityDetail from '../pages/InstructorPages/ReportEntityDetail/ReportEntityDetail.jsx'

export default function MainRoutes() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Routes>
                 <Route path='/' element={<UserLayout />} >
                    <Route index element={<Home />} />
                    <Route path='profile' element={<UserProfile />} />

                    <Route path='driving-license' element={<DrivingLicense />} />
                    <Route path='driving-license/:licenseId' element={<ChapterLesson />} />
                    <Route path='driving-license/:licenseId/chapter/:chapterId/lesson/:lessonId' element={<LearningLesson />} />
                    <Route path='driving-license/:licenseId/chapter/:chapterId/lesson/:lessonId/quiz/:progressId' element={<LessonQuiz />} />

                    <Route path='simulation' element={<SimulationIntroduction />} />
                    <Route path='simulation/scenarios' element={<SimulationScenario />} />

                    <Route path='forum' element={<Forum />} />

                    <Route path='learning' element={<Learning />} />
                    <Route path='learning/theory-question' element={<TheoryQuestion />} />
                    <Route path='learning/question-flashcard' element={<QuestionFlashcard />} />
                    <Route path='learning/list-traffic-sign' element={<ListTrafficSign />} />
                    <Route path='learning/list-traffic-sign/:signId' element={<TrafficSignDetail />} />
                    <Route path='learning/traffic-sign-flashcard' element={<TrafficSignFlashcard />} />
                    <Route path='learning/traffic-sign-flip-book' element={<TrafficSignFlipBook />} />
                    <Route path='learning/list-exam' element={<ListExam />} />
                    <Route path='learning/list-exam/:examId' element={<ExamDetail />} />
                    <Route path='learning/list-exam/:examId/taking-exam' element={<QuestionExam />} />

                    <Route path='read-excel-data' element={<ExcelMultiSheetViewer />} />
                </Route>  

                <Route path='/three-scene' element={<ThreeScene />} />
                <Route path='/car' element={<CarScene />} />

                <Route path='admin'element={<Require allowedRoles={['Admin']}><AdminLayout /></Require>}>
                    <Route index element={<Navigate to='dashboard' replace />} />
                    <Route path='dashboard' element={<AdminDashboard />} />
                    <Route path='user-management' element={<AdminUserManagement/>}/>
                    <Route path='user-management/create' element={<AdminUserManagement openCreateInitially />} />
                    <Route path='user-management/:userId' element={<AdminUserManagement />} />
                    <Route path='system-config' element={<AdminSystemConfig />} />
                    <Route path='scoring-rules' element={<AdminScoringRules />} />
                    <Route path='scoring-rules/:examId/setup' element={<AdminScoringRules openSetupInitially />} />
                    <Route path='categories' element={<AdminCategoriesHub />} />
                    <Route path='categories/:type/create' element={<AdminCategoriesHub openCreateInitially />} />
                    <Route path='categories/:type/:id/edit' element={<AdminCategoriesHub openEditInitially />} />
                    <Route path='change-requests' element={<AdminChangeRequests />} />
                    <Route path='change-requests/create' element={<AdminChangeRequests openCreateInitially />} />
                    <Route path='pending-posts' element={<AdminPendingPosts />} />
                    <Route path='community-reports' element={<AdminCommunityReports />} />
                    <Route path='report-entity/:entityType/:entityId' element={<InsReportEntityDetail />} />
                    <Route path='generate-reports' element={<AdminGenerateReports />} />
                        
                    <Route path='notifications' element={<AdminNotifications />}/>
                    <Route path='profile' element={<AdminProfile />}/>
                </Route>

                {/* Instructor CMS Routes */}
                <Route path='/instructor' element={<Require allowedRoles={['Instructor']}><InstructorLayout /></Require>} >
                    <Route index element={<Navigate to='dashboard' replace />} />
                    <Route path='dashboard' element={<InsDashboard />} />
                    <Route path='question-bank' element={<InsQuestionBank />} />
                    <Route path='question-bank/:questionId' element={<InsQuestionDetail />} />
                    <Route path='lesson-management' element={<InsLessonMgmt />} />
                    <Route path='chapter-management' element={<InsChapterMgmt />} />
                    <Route path='license-management' element={<InsLicenseMgmt />} />
                    <Route path='vehicle-management' element={<InsVehicleMgmt />} />
                    <Route path='traffic-sign-bank' element={<InsTrafficSignBank />} />
                    <Route path='simulation-bank' element={<InsSimulationBank />} />
                    <Route path='exam-management' element={<InsExamMgmt />} />
                    <Route path='pending-posts' element={<InsPendingPosts />} />
                    <Route path='posts-list' element={<InsPosts />} />
                    <Route path='community-reports' element={<InsCommunityReports />} />
                    <Route path='content-error-reports' element={<InsContentErrorReports />} />
                    <Route path='change-requests' element={<InsChangeRequests />} />
                    <Route path='report-processing' element={<InsReportProcessing />} />
                    <Route path='report-entity/:entityType/:entityId' element={<InsReportEntityDetail />} />
                    <Route path='simulation-exam-management' element={<InsSimulationExamMgmt />} />
                </Route>
            </Routes>
            <BoxChat />
        </BrowserRouter>
    )
}
