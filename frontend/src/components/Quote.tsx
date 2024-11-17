import { useTypewriter } from 'react-simple-typewriter';

export const Quote = () => {
    const [ text ] = useTypewriter({
        words: ['PostScape'],
        loop: true,
        typeSpeed: 100, // Adjust typing speed
        deleteSpeed: 50, // Adjust delete speed
        delaySpeed: 1000, // Adjust delay before restarting
    });

    return (
        <div className="bg-slate-200 h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div className="pb-4 text-6xl">
                    {text}
                </div>
            </div>

            <div className="flex justify-center mt-10">
                <div className="max-w-lg text-3xl">
                    <div className="font-bold text-center">
                        "A landscape where every post finds its place, and every idea unfolds into a world of endless possibilities"
                    </div>
                </div>
            </div>
        </div>
    );
};
