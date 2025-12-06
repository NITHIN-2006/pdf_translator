export default function LoadingPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-background via-secondary to-background flex items-center justify-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating gradient orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-accent rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Main loading container */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-12 px-4">
        {/* Animated spinner with multiple rings */}
        <div className="relative w-32 h-32">
          {/* Outer glowing ring */}
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary border-r-primary opacity-70 animate-spin-smooth"></div>

          {/* Middle pulsing ring */}
          <div className="absolute inset-3 rounded-full border-2 border-primary border-opacity-40 animate-pulse-glow"></div>

          {/* Inner rotating ring */}
          <div className="absolute inset-6 rounded-full border-4 border-transparent border-b-accent border-l-accent opacity-60 animate-spin-smooth" style={{ animationDirection: 'reverse', animationDuration: '2.5s' }}></div>

          {/* Center dot */}
          <div className="absolute inset-1/3 rounded-full bg-gradient-to-br from-primary to-accent shadow-lg"></div>
        </div>

        {/* Loading text */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground animate-fade-in">
            Loading...
          </h1>
          <p className="text-muted-foreground text-sm md:text-base max-w-xs animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Preparing your experience
          </p>
        </div>

        {/* Animated progress indicator */}
        <div className="w-48 h-1 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
            style={{
              animation: 'shimmer 2s infinite',
              backgroundSize: '200% 100%'
            }}
          ></div>
        </div>

        {/* Orbiting dots */}
        <div className="relative w-20 h-20">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-primary rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-orbit"
              style={{
                animationDelay: `${i * 1.33}s`
              }}
            ></div>
          ))}
        </div>

        {/* Status messages with staggered animation */}
        <div className="flex gap-2 text-xs text-muted-foreground">
          <span className="animate-fade-in" style={{ animationDelay: '0.4s' }}>●</span>
          <span className="animate-fade-in" style={{ animationDelay: '0.6s' }}>●</span>
          <span className="animate-fade-in" style={{ animationDelay: '0.8s' }}>●</span>
        </div>
      </div>
    </div>
  );
}