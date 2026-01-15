import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ScrollToTop from '../hooks/ScrollToTop/useScrollToTop.jsx'
import ExamTemp from '../pages/ExamTemp/ExamTemp.jsx'
import LearningSign from '../pages/LearningSign/LearningSign.jsx'

export default function MainRoutes() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <></>
            <Routes>
                {/* <Route path='/' element={<ExamTemp />} /> */}
                <Route path='/' element={<LearningSign />} />
                <Route path='*' element={<></>} />
            </Routes>
            <></>
        </BrowserRouter>
    )
}
