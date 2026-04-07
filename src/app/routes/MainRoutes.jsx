import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import ScrollToTop from '../hooks/ScrollToTop/useScrollToTop.jsx'

import ControlledVideo from '../pages/SimulationScenario/ControlledVideo/ControlledVideo.jsx'
import CoreLearning from '../pages/CoreLearning/CoreLearning.jsx'

import UserLayout from '../layouts/UserLayout/UserLayout.jsx'
import UserHeader from '../layouts/Header/UserHeader.jsx'
import Footer from '../layouts/Footer/Footer.jsx'

import Home from '../pages/Home/Home.jsx'

import DrivingLicense from '../pages/DrivingLicense/DrivingLicense.jsx'
import ChapterLesson from '../pages/DrivingLicense/ChapterLesson/ChapterLesson.jsx'
import LearningLesson from '../pages/DrivingLicense/LearningLesson/LearningLesson.jsx'
import LessonQuiz from '../pages/DrivingLicense/LessonQuiz/LessonQuiz.jsx'
import QuizResult from '../pages/DrivingLicense/LessonQuiz/QuizResult.jsx'
import ListExam from '../pages/ExamTemp/ListExam.jsx'
import ExamTemp from '../pages/ExamTemp/ExamTemp.jsx'

import SimulationIntroduction from '../pages/SimulationScenario/SimulationIntroduction.jsx'
import SimulationScenario from '../pages/SimulationScenario/SimulationScenario.jsx'

import Forum from '../pages/Forum/Forum.jsx'

import Learning from '../pages/Learning/Learning.jsx'



import LearningQuestion from '../pages/LearningQuestion/LearningQuestion.jsx'
import LearningSign from '../pages/LearningSign/LearningSign.jsx'
import TrafficSignFlipBook from '../pages/TrafficSignFlipBook/TrafficSignFlipBook.jsx'

import CarScene from '../pages/ThreeScene/CarScene.jsx'
import ThreeScene from '../pages/ThreeScene/ThreeScene.jsx'

import AdminSideBar from '../pages/AdminPages/AdminSideBar/AdminSideBar.jsx'
import QuestionManagement from '../pages/AdminPages/QuestionManagement/QuestionManagement.jsx'
import LessonManagement from '../pages/AdminPages/LessonManagement/LessonManagement.jsx'
import UserManagement from '../pages/AdminPages/UserManagement/UserManagement.jsx'

import StarsBackground from '../components/StarsBackground/StarsBackground.jsx'
import ForumComment from '../pages/Forum/ForumComment.jsx'
import ExcelMultiSheetViewer from '../pages/ReadExcelData/ExcelMultiSheetViewer.jsx'

import SelectedChapter from '../pages/DrivingLicense/ChapterLesson/SelectedChapter.jsx'

import BoxChat from '../components/BoxChat/BoxChat.jsx'
/* Instructor CMS Pages */
import InstructorLayout from '../components/InstructorComponent/InstructorLayout.jsx'
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
import InsMyPosts from '../pages/InstructorPages/MyPosts/MyPosts.jsx'
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

                    <Route path='driving-license' element={<DrivingLicense />} />
                    <Route path='driving-license/:licenseId' element={<ChapterLesson />} />
                    <Route path='driving-license/:licenseId/chapter/:chapterId/lesson/:lessonId' element={<LearningLesson />} />
                    <Route path='driving-license/:licenseId/chapter/:chapterId/lesson/:lessonId/quiz' element={<LessonQuiz />} />
                    <Route path='driving-license/:licenseId/chapter/:chapterId/lesson/:lessonId/quiz/result' element={<QuizResult />} />

                    <Route path='simulation' element={<SimulationIntroduction />} />
                    <Route path='simulation/scenarios' element={<SimulationScenario />} />

                    <Route path='forum' element={<Forum />} />

                    <Route path='driving-license/:licenseId/chapter/:chapterId/lesson/:lessonId/list-exam' element={<ListExam />} />
                    <Route path='driving-license/:licenseId/chapter/:chapterId/lesson/:lessonId/list-exam/exam/:examId' element={<ExamTemp />} />

                    <Route path='learning' element={<Learning />} />



                    <Route path='learning/theory-question' element={<CoreLearning />} />
                    <Route path='learning/question-flashcard' element={<LearningQuestion />} />
                    <Route path='learning/list-traffic-sign' element={<LearningSign />} />
                     {/* <Route path='learning/list-traffic-sign/:id' element={<LearningSign />} />  */}
                    <Route path='learning/traffic-sign-flip-book' element={<TrafficSignFlipBook />} />
                    <Route path='learning/list-exam' element={<ListExam />} />

                    <Route path='read-excel-data' element={<ExcelMultiSheetViewer />} />
                </Route>  

                <Route path='/three-scene' element={<ThreeScene />} />
                <Route path='/car' element={<CarScene />} />

                <Route path='admin' element={<AdminSideBar />} >
                    <Route index element={<Navigate to='user-management' replace />} />
                    <Route path='user-management' element={<UserManagement />} />
                    <Route path='question-management' element={<QuestionManagement />} />
                    <Route path='lesson-management' element={<LessonManagement />} />
                </Route>

                {/* Instructor CMS Routes */}
                <Route path='/instructor' element={<InstructorLayout />} >
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
                    <Route path='my-posts' element={<InsMyPosts />} />
                    <Route path='my-posts-list' element={<InsMyPosts />} />
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
