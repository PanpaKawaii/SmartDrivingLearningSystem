import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import ScrollToTop from '../hooks/ScrollToTop/useScrollToTop.jsx'

import UserLayout from '../layouts/UserLayout/UserLayout.jsx'

import Home from '../pages/Home/Home.jsx'

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
// 
// 
import TrafficSignFlashcard from '../pages/Learning/TrafficSignFlashcard/TrafficSignFlashcard.jsx'
import TrafficSignFlipBook from '../pages/Learning/TrafficSignFlipBook/TrafficSignFlipBook.jsx'
import ListExam from '../pages/Learning/QuestionExam/ListExam.jsx'
import QuestionExam from '../pages/Learning/QuestionExam/QuestionExam.jsx'

import ExcelMultiSheetViewer from '../pages/ReadExcelData/ExcelMultiSheetViewer.jsx'

import CarScene from '../pages/ThreeScene/CarScene.jsx'
import ThreeScene from '../pages/ThreeScene/ThreeScene.jsx'

import AdminSideBar from '../pages/AdminPages/AdminSideBar/AdminSideBar.jsx'
import QuestionManagement from '../pages/AdminPages/QuestionManagement/QuestionManagement.jsx'
import LessonManagement from '../pages/AdminPages/LessonManagement/LessonManagement.jsx'
import UserManagement from '../pages/AdminPages/UserManagement/UserManagement.jsx'

import BoxChat from '../components/BoxChat/BoxChat.jsx'

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
                    <Route path='driving-license/:licenseId/chapter/:chapterId/lesson/:lessonId/quiz/:progressId' element={<LessonQuiz />} />

                    <Route path='simulation' element={<SimulationIntroduction />} />
                    <Route path='simulation/scenarios' element={<SimulationScenario />} />

                    <Route path='forum' element={<Forum />} />

                    <Route path='learning' element={<Learning />} />



                    <Route path='learning/theory-question' element={<TheoryQuestion />} />
                    <Route path='learning/question-flashcard' element={<QuestionFlashcard />} />
                    {/* <Route path='learning/list-traffic-sign' element={<ListTrafficSign />} /> */}
                    {/* <Route path='learning/list-traffic-sign/:signId' element={<TrafficSignDetail />} /> */}
                    <Route path='learning/traffic-sign-flashcard' element={<TrafficSignFlashcard />} />
                    <Route path='learning/traffic-sign-flip-book' element={<TrafficSignFlipBook />} />
                    <Route path='learning/list-exam' element={<ListExam />} />
                    <Route path='learning/list-exam/:examId' element={<QuestionExam />} />

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
            </Routes>
            <BoxChat />
        </BrowserRouter>
    )
}
