import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { IssueReportGenerator } from './services/report-generator';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// API Routes
app.get('/api/roadmap-options', async (req: Request, res: Response) => {
  try {
    const { GitHubAPIService } = await import('./services/github-api');
    const githubAPI = new GitHubAPIService();
    const options = await githubAPI.getRoadmapTeamAndStatusOptions();
    res.json(options);
  } catch (error) {
    console.error('Error fetching roadmap options:', error);
    res.status(500).json({ error: 'Failed to fetch roadmap options' });
  }
});

app.post('/api/generate-report', async (req: Request, res: Response) => {
  try {
    const { team, status } = req.body;
    if (!team || !status) {
      return res.status(400).json({ error: 'Team and status are required' });
    }
    const { IssueReportGenerator } = await import('./services/report-generator');
    const generator = new IssueReportGenerator();
    const report = await generator.generateReportForTeamStatus(team, status);
    return res.json({ success: true, report, generatedAt: new Date().toISOString() });
  } catch (error) {
    console.error('Error generating report:', error);
    return res.status(500).json({ error: 'Failed to generate report', details: error instanceof Error ? error.message : 'Unknown error' });
  }
});

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, '../ui/build')));

// For any other request, send back the React app
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../ui/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 API available at http://localhost:${PORT}/api`);
  console.log(`🌐 Frontend available at http://localhost:${PORT}`);
}); 