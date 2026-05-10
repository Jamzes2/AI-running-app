import RecentRunsWidget from "../components/dashboard/widgets/RecentRunsWidget";
import KeyStatsWidget from "../components/dashboard/widgets/KeyStatsWidget";
import WeeklyVolumeWidget from "../components/dashboard/widgets/WeeklyVolumeWidget";
import AISummaryWidget from "../components/dashboard/widgets/AISummaryWidget";

export const widgetMap = {
  recent_runs: RecentRunsWidget,
  key_stats: KeyStatsWidget,
  weekly_volume: WeeklyVolumeWidget,
  ai_summary: AISummaryWidget,
};
