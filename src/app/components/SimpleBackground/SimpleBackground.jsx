import '../../styles/index-C8OZutwC.css';

export default function SimpleBackground() {
    return (
        <div className='fixed inset-0 -z-10 overflow-hidden'>
            <div className='absolute inset-0 bg-gradient-to-br from-[#0a0e27] via-[#1a1f3a] to-[#0f172a] animate-gradient'></div>
            <div className='absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/30 rounded-full blur-3xl animate-float'></div>
            <div className='absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-cyan-500/30 rounded-full blur-3xl animate-float'
                style={{ animationDelay: '2s' }}></div>
            <div className='absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-purple-500/30 rounded-full blur-3xl animate-float'
                style={{ animationDelay: '4s' }}></div>
            <div className='absolute top-1/4 right-1/3 w-[500px] h-[500px] bg-pink-500/20 rounded-full blur-3xl animate-float'
                style={{ animationDelay: '1s' }}></div>
            <div className='absolute bottom-1/4 left-1/3 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-3xl animate-float'
                style={{ animationDelay: '3s' }}></div>
            <div className='absolute top-0 left-0 w-full h-full'>
                <div className='absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-2xl animate-pulse-glow'></div>
                <div className='absolute bottom-1/3 right-1/4 w-64 h-64 bg-purple-400/10 rounded-full blur-2xl animate-pulse-glow'
                    style={{ animationDelay: '1s' }}></div>
                <div className='absolute top-1/2 right-1/3 w-64 h-64 bg-cyan-400/10 rounded-full blur-2xl animate-pulse-glow'
                    style={{ animationDelay: '2s' }}></div>
            </div>
            {/* <div className='absolute inset-0 bg-gradient-to-t from-[#0a0e27] via-transparent to-transparent'></div> */}
            {/* <div className='absolute inset-0 bg-gradient-to-b from-[#0a0e27]/50 via-transparent to-[#0a0e27]/50'></div> */}

            <div className='absolute top-0 left-0 w-full h-full pointer-events-none'>
                <div className='absolute top-1/4 left-1/3 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse-glow'></div>
                <div className='absolute bottom-1/4 right-1/3 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse-glow'
                    style={{ animationDelay: '1.5s' }}></div>
            </div>
        </div>
    )
}
