import { Activity } from '@/interfaces/main.interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ActivityState {
  activities: Activity[];

}

const initialState: ActivityState = {
  activities: [],
};

const activitySlice = createSlice({
  name: 'activities',
  initialState,
  reducers: {
    addActivity(state, action: PayloadAction<Omit<Activity, 'id'>>) {
      state.activities.push(action.payload);
    },
    updateActivity(state, action: PayloadAction<{ id: string; updates: Partial<Activity> }>) {
      const { id, updates } = action.payload;
      const index = state.activities.findIndex((activity) => activity.id === id);
      if (index !== -1) {
        state.activities[index] = { ...state.activities[index], ...updates };
      }
    },
    deleteActivity(state, action: PayloadAction<string>) {
      state.activities = state.activities.filter((activity) => activity.id !== action.payload);
    },
    resetActivities(state) {
      state.activities = [];
    },
  },
});

export const { addActivity, updateActivity, deleteActivity, resetActivities } = activitySlice.actions;
export default activitySlice.reducer;
