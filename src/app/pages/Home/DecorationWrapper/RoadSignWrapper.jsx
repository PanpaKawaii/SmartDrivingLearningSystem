
export default function RoadSignWrapper() {
    return (
        <div className='road-sign-wrapper-container'>
            <div className='road-sign-3d'>
                <div className='road-sign-pole'></div>
                <div className='road-sign-board'>
                    {/* <svg width='400' height='350' viewBox='0 0 400 350' xmlns='http://www.w3.org/2000/svg'>
                        <polygon points='200,20 20,330 380,330' fill='#FFD42A' stroke='#111111' stroke-width='20' stroke-linejoin='round' />
                        <rect x='180' y='110' width='40' height='130' rx='20' fill='#111111' />
                        <circle cx='200' cy='280' r='20' fill='#111111' />
                    </svg> */}
                    <svg width='400' height='350' viewBox='0 0 400 350' xmlns='http://www.w3.org/2000/svg'>
                        <polygon points='200,20 20,350 380,350' fill='#F4C430' stroke='#F4C430' stroke-width='40' stroke-linejoin='round' />
                        <polygon points='200,20 20,350 380,350' fill='none' stroke='#1A1A1A' stroke-width='16' stroke-linejoin='round' />
                        <polygon points='192,150 208,150 200,260' fill='none' stroke='#1A1A1A' stroke-width='20' stroke-linejoin='round' />
                        <circle cx='200' cy='150' r='18' fill='#1A1A1A' />
                        <circle cx='200' cy='300' r='18' fill='#1A1A1A' />
                    </svg>
                </div>
            </div>
        </div>
    )
}
