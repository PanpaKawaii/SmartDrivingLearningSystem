import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ScrollToTop from '../hooks/ScrollToTop/useScrollToTop.jsx'
import Header from '../layouts/Header/Header.jsx'
import ExamTemp from '../pages/ExamTemp/ExamTemp.jsx'
import LearningQuestion from '../pages/LearningQuestion/LearningQuestion.jsx'
import LearningSign from '../pages/LearningSign/LearningSign.jsx'

export default function MainRoutes() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Header />
            <Routes>
                <Route path='/core-learning' element={<LearningSign />} />
                <Route path='/learning-question' element={<LearningQuestion />} />
                <Route path='/learning-sign' element={<LearningSign />} />
                <Route path='/exam' element={<ExamTemp />} />
                <Route path='*' element={<></>} />
            </Routes>
            <></>
        </BrowserRouter>
    )
}
