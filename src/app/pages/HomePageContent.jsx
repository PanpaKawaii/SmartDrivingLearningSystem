
export default function HomePageContent() {
    return (
        <div>
            <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center opacity-10"><svg
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"
                    className="lucide lucide-car w-[600px] h-[600px] text-cyan-400 animate-rotate-glow">
                    <path
                        d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2">
                    </path>
                    <circle cx="7" cy="17" r="2"></circle>
                    <path d="M9 17h6"></path>
                    <circle cx="17" cy="17" r="2"></circle>
                </svg></div>
                <div className="absolute top-1/4 left-10 w-2 h-2 bg-cyan-400 rounded-full animate-float blur-sm"></div>
                <div className="absolute top-1/3 right-20 w-3 h-3 bg-blue-400 rounded-full animate-float blur-sm"
                    style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-1/4 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-float blur-sm"
                    style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-pink-400 rounded-full animate-float blur-sm"
                    style={{ animationDelay: '1.5s' }}></div>
                <div className="absolute inset-0 opacity-20">
                    <div
                        className="absolute top-20 left-1/4 w-64 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-float">
                    </div>
                    <div
                        className="absolute bottom-40 right-1/4 w-48 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-float"
                        style={{ animationDelay: '2s' }}></div>
                    <div
                        className="absolute top-1/2 left-10 w-56 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-float"
                        style={{ animationDelay: '3s' }}></div>
                </div>
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                    <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse-glow"></div>
                    <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse-glow"
                        style={{ animationDelay: '1.5s' }}></div>
                </div>
                <div className="relative z-10 text-center max-w-6xl mx-auto">
                    <div className="transition-all duration-1000 opacity-100 translate-y-0">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-8 animate-pulse-glow"><svg
                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            className="lucide lucide-zap w-4 h-4 text-yellow-400">
                            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                        </svg><span className="text-sm font-medium text-cyan-300">Next-Gen Learning Platform</span></div>
                        <h1 className="text-7xl md:text-8xl font-bold mb-6 leading-tight">
                            <div className="gradient-text">Smart Driving</div>
                            <div className="text-white">Learning System</div>
                        </h1>
                        <p
                            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto transition-all duration-1000 delay-300 opacity-100 translate-y-0">
                            Experience the future of driver education with AI-powered learning, immersive simulators, and real-time
                            guidance</p>
                        <div
                            className="flex flex-col sm:flex-row gap-6 justify-center transition-all duration-1000 delay-500 opacity-100 translate-y-0">
                            <button
                                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full text-lg font-semibold overflow-hidden hover-lift neon-blue transition-all duration-300 hover:scale-110 hover:shadow-2xl"><span
                                    className="relative z-10 flex items-center gap-2">Start Learning<svg xmlns="http://www.w3.org/2000/svg"
                                        width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                        strokeLinecap="round" strokeLinejoin="round"
                                        className="lucide lucide-chevron-right w-5 h-5 group-hover:translate-x-2 transition-transform duration-300">
                                        <path d="m9 18 6-6-6-6"></path>
                                    </svg></span>
                                <div
                                    className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                </div>
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div
                                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-white/20 rounded-full blur-xl">
                                    </div>
                                </div>
                            </button>
                            <button
                                className="group relative px-8 py-4 glass-panel-dark rounded-full text-lg font-semibold border-2 border-cyan-500 hover-lift neon-cyan transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:border-purple-500"><span
                                    className="relative z-10 flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                                        height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                        strokeLinecap="round" strokeLinejoin="round"
                                        className="lucide lucide-car w-5 h-5 group-hover:rotate-12 transition-transform duration-300">
                                        <path
                                            d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2">
                                        </path>
                                        <circle cx="7" cy="17" r="2"></circle>
                                        <path d="M9 17h6"></path>
                                        <circle cx="17" cy="17" r="2"></circle>
                                    </svg>Enter Simulator<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="lucide lucide-chevron-right w-5 h-5 group-hover:translate-x-2 transition-transform duration-300">
                                        <path d="m9 18 6-6-6-6"></path>
                                    </svg></span>
                                <div
                                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full">
                                </div>
                            </button>
                        </div>
                    </div>
                    <div
                        className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 delay-700 opacity-100 translate-y-0">
                        <div className="group glass-panel rounded-2xl p-6 hover-lift cursor-pointer relative overflow-hidden">
                            <div
                                className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                            </div>
                            <div
                                className="absolute -inset-1 bg-gradient-to-br from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500">
                            </div>
                            <div className="relative z-10">
                                <div
                                    className="text-4xl font-bold gradient-text mb-2 group-hover:scale-110 transition-transform duration-300">
                                    50K+</div>
                                <div className="text-gray-400 group-hover:text-gray-300 transition-colors">Active Learners</div>
                            </div>
                            <div
                                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            </div>
                        </div>
                        <div className="group glass-panel rounded-2xl p-6 hover-lift cursor-pointer relative overflow-hidden">
                            <div
                                className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                            </div>
                            <div
                                className="absolute -inset-1 bg-gradient-to-br from-cyan-500 to-purple-500 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500">
                            </div>
                            <div className="relative z-10">
                                <div
                                    className="text-4xl font-bold gradient-text mb-2 group-hover:scale-110 transition-transform duration-300">
                                    98%</div>
                                <div className="text-gray-400 group-hover:text-gray-300 transition-colors">Pass Rate</div>
                            </div>
                            <div
                                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            </div>
                        </div>
                        <div className="group glass-panel rounded-2xl p-6 hover-lift cursor-pointer relative overflow-hidden">
                            <div
                                className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                            </div>
                            <div
                                className="absolute -inset-1 bg-gradient-to-br from-purple-500 to-pink-500 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500">
                            </div>
                            <div className="relative z-10">
                                <div
                                    className="text-4xl font-bold gradient-text mb-2 group-hover:scale-110 transition-transform duration-300">
                                    24/7</div>
                                <div className="text-gray-400 group-hover:text-gray-300 transition-colors">AI Support</div>
                            </div>
                            <div
                                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 border-2 border-cyan-400 rounded-full flex items-start justify-center p-2">
                        <div className="w-1 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
                    </div>
                </div>
            </section>
        </div>
    )
}
