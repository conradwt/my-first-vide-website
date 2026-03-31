# Blood Pressure Tracker

A modern web application to track your blood pressure readings over time, built with React and Next.js.

## Features

✨ **Easy Blood Pressure Logging**
- Log systolic and diastolic pressure readings
- Record heart rate (BPM)
- Select left or right arm
- Add optional notes for each reading

📊 **Statistics & Insights**
- Average systolic and diastolic readings
- Average heart rate
- Latest reading display
- Reading category breakdown (Normal, Elevated, High)

🏥 **Blood Pressure Categories**
- **Normal**: < 120/80 mmHg
- **Elevated**: 120-129/<80 mmHg
- **High Stage 1**: 130-139/80-89 mmHg
- **High Stage 2**: ≥ 140/90 mmHg
- **Hypertensive Crisis**: ≥ 180/120 mmHg

💾 **Local Data Storage**
- All your readings are stored locally in your browser
- No data sent to servers (except deployment to Vercel)
- Complete privacy and control over your health data

📱 **Fully Responsive**
- Works seamlessly on desktop, tablet, and mobile devices

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Date Handling**: date-fns
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ and npm (or yarn/pnpm)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd blood-pressure-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Building for Production

```bash
npm run build
npm start
```

## Deployment on Vercel

### Method 1: Via Git (Recommended)

1. Push your code to GitHub, GitLab, or Bitbucket

2. Visit [Vercel Dashboard](https://vercel.com/dashboard)

3. Click "New Project" and import your repository

4. Vercel will automatically detect Next.js and configure build settings

5. Click "Deploy"

### Method 2: Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

## Usage

1. **Add a Reading**:
   - Enter your systolic pressure (upper number)
   - Enter your diastolic pressure (lower number)
   - Enter your heart rate in BPM
   - Select the arm (left or right)
   - Optionally add notes
   - Click "Save Reading"

2. **View History**:
   - All readings are displayed in reverse chronological order
   - Each reading shows the category (color-coded)
   - Delete readings with the delete button

3. **Track Statistics**:
   - View average readings
   - See your latest reading
   - Check reading category distribution

## Important Disclaimers

⚠️ This application is for personal health tracking purposes only and should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always consult with a healthcare provider if you have concerns about your blood pressure.

## Privacy

Your data is stored entirely in your browser's local storage. No personal health information is sent to any server. The application only uses Vercel's standard web hosting infrastructure.

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License - feel free to use this in your projects.

## Support

For issues or questions, please open an issue on GitHub.

---

**Built with ❤️ for better health tracking**