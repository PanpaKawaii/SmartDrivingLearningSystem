import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import ScrollToTop from '../hooks/ScrollToTop/useScrollToTop.jsx'

import Header from '../layouts/Header/Header.jsx'
import ControlledVideo from '../pages/ControlledVideo/ControlledVideo.jsx'
import CoreLearning from '../pages/CoreLearning/CoreLearning.jsx'
import ExamTemp from '../pages/ExamTemp/ExamTemp.jsx'
import ListExam from '../pages/ExamTemp/ListExam.jsx'
import Forum from '../pages/Forum/Forum.jsx'
import Home from '../pages/Home/Home.jsx'
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
import UserLayout from '../layouts/UserLayout/UserLayout.jsx'
import Learning from '../pages/Learning/Learning.jsx'
import ForumPopup from '../pages/Forum/ForumPopup.jsx'
import ReadExcelData from '../pages/ReadExcelData/ReadExcelData.jsx'

import LearningProgress from '../pages/DrivingLicense/LearningProgress.jsx'
import SelectedChapter from '../pages/DrivingLicense/SelectedChapter.jsx'
import DrivingLicense from '../pages/DrivingLicense/DrivingLicense.jsx'
import ChapterLesson from '../pages/DrivingLicense/ChapterLesson.jsx'
import LearningLesson from '../pages/DrivingLicense/LearningLesson.jsx'

export default function MainRoutes() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            {/* <Routes>
                <Route path='/' element={<Header />} >
                    <Route index element={<Home />} />
                    <Route path='core-learning' element={<CoreLearning />} />
                    <Route path='learning-question' element={<LearningQuestion />} />
                    <Route path='learning-sign' element={<LearningSign />} />
                    <Route path='list-exam' element={<ListExam />} />
                    <Route path='list-exam/:id' element={<ExamTemp />} />
                    <Route path='forum' element={<Forum />} />
                    <Route path='controlled-video' element={<ControlledVideo />} />
                    <Route path='traffic-sign-flip-book' element={<TrafficSignFlipBook />} />
                </Route>

                <Route path='/three-scene' element={<ThreeScene />} />
                <Route path='/car' element={<CarScene />} />

                <Route path='admin' element={<AdminSideBar />} >
                    <Route index element={<Navigate to='user-management' replace />} />
                    <Route path='user-management' element={<UserManagement />} />
                    <Route path='question-management' element={<QuestionManagement />} />
                </Route>
            </Routes> */}


            <Routes>
                <Route path='/' element={<UserLayout />} >
                    <Route index element={<Home />} />
                    <Route path='learning' element={<Learning />} />
                    <Route path='learning/theory-question' element={<CoreLearning />} />
                    <Route path='learning/question-flashcard' element={<LearningQuestion />} />
                    <Route path='learning/list-traffic-sign' element={<LearningSign />} />
                    {/* <Route path='learning/list-traffic-sign/:id' element={<LearningSign />} /> */}
                    <Route path='learning/traffic-sign-flip-book' element={<TrafficSignFlipBook />} />
                    <Route path='learning/list-exam' element={<ListExam />} />
                    <Route path='learning/list-exam/:id' element={<ExamTemp />} />
                    <Route path='learning/list-simulation' element={<ControlledVideo />} />
                    {/* <Route path='learning/list-simulation/:id' element={<ControlledVideo />} /> */}

                    <Route path='forum-post' element={<ForumPopup />} />
                    <Route path='forum' element={<Forum />} />

                    <Route path='driving-license' element={<DrivingLicense />} />
                    <Route path='driving-license/:licenseId' element={<ChapterLesson />} />
                    <Route path='driving-license/:licenseId/chapter/:chapterId/lesson/:lessonId' element={<LearningLesson />} />
                    <Route path='driving-license/:licenseId/chapter/:chapterId/lesson/:lessonId/list-exam' element={<ListExam />} />
                    <Route path='driving-license/:licenseId/chapter/:chapterId/lesson/:lessonId/list-exam/exam/:examId' element={<ExamTemp />} />

                    <Route path='read-excel-data' element={<ReadExcelData />} />
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


            {/* <UserLayout>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/core-learning' element={<CoreLearning />} />
                    <Route path='/learning-question' element={<LearningQuestion />} />
                    <Route path='/learning-sign' element={<LearningSign />} />
                    <Route path='/list-exam' element={<ListExam />} />
                    <Route path='/list-exam/:id' element={<ExamTemp />} />
                    <Route path='/forum' element={<Forum />} />
                    <Route path='/controlled-video' element={<ControlledVideo />} />
                    <Route path='/traffic-sign-flip-book' element={<TrafficSignFlipBook />} />
                    <Route path='*' element={<></>} />
                </Routes>
            </UserLayout>
            <Routes>
                <Route path='/three-scene' element={<ThreeScene />} />
                <Route path='/car' element={<CarScene />} />

                <Route path='admin' element={<AdminSideBar />} >
                    <Route index element={<Navigate to='user-management' replace />} />
                    <Route path='user-management' element={<UserManagement />} />
                    <Route path='question-management' element={<QuestionManagement />} />
                </Route>
            </Routes> */}
        </BrowserRouter>
    )
}
