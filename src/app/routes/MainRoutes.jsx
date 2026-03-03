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
import UserManagement from '../pages/AdminPages/UserManagement/UserManagement.jsx'

import StarsBackground from '../components/StarsBackground/StarsBackground.jsx'
import UserLayout from '../layouts/UserLayout/UserLayout.jsx'

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
