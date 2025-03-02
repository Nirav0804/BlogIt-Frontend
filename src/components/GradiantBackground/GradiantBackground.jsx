const GradientBackground = ({ children }) => {
    return (
        <div className="bg-gradient-to-r from-purple-200 via-gray-150 to-purple-200 min-h-screen">
            {children}
        </div>
    );
};

export default GradientBackground;
