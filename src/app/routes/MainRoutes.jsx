import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import ScrollToTop from '../hooks/ScrollToTop/useScrollToTop.jsx'

import Header from '../layouts/Header/Header.jsx'
import ControlledVideo from '../pages/ControlledVideo/ControlledVideo.jsx'
import CoreLearning from '../pages/CoreLearning/CoreLearning.jsx'
import ExamTemp from '../pages/ExamTemp/ExamTemp.jsx'
import Forum from '../pages/Forum/Forum.jsx'
import LearningQuestion from '../pages/LearningQuestion/LearningQuestion.jsx'
import LearningSign from '../pages/LearningSign/LearningSign.jsx'

import CarScene from '../pages/ThreeScene/CarScene.jsx'
import ThreeScene from '../pages/ThreeScene/ThreeScene.jsx'

import AdminSideBar from '../pages/AdminPages/AdminSideBar/AdminSideBar.jsx'
import UserManagement from '../pages/AdminPages/UserManagement/UserManagement.jsx'

export default function MainRoutes() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Header />
            <Routes>
                <Route path='/' element={<></>} />
                <Route path='/core-learning' element={<CoreLearning />} />
                <Route path='/learning-question' element={<LearningQuestion />} />
                <Route path='/learning-sign' element={<LearningSign />} />
                <Route path='/exam' element={<ExamTemp />} />
                <Route path='/forum' element={<Forum />} />
                <Route path='/controlled-video' element={<ControlledVideo />} />
                <Route path='/three-scene' element={<ThreeScene />} />
                <Route path='/car' element={<CarScene />} />
                <Route path='*' element={<></>} />

                <Route path='admin' element={<AdminSideBar />} >
                    <Route index element={<Navigate to='user-management' replace />} />
                    <Route path='user-management' element={<UserManagement />} />
                </Route>
            </Routes>
            <></>
        </BrowserRouter>
    )
}
