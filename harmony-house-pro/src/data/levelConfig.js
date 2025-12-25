const levels = [
  { id: 'cutlery', component: 'LevelCutlery' },
  { id: 'books', component: 'LevelBooks' },
  { id: 'tiles', component: 'LevelTiles' },
  // ... add 20 levels here
];

export function getDailyLevel() {
  const today = new Date();
  // Create a unique number for the day (e.g., Day of year)
  const start = new Date(today.getFullYear(), 0, 0);
  const diff = today - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);

  // Modulo operator loops through your levels forever
  // If you have 20 levels, day 21 goes back to level 1.
  const levelIndex = dayOfYear % levels.length;
  
  return levels[levelIndex];
}