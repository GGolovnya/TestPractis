import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PracticeState {
  currentTask: string;
  completedTasks: string[];
  score: number;
}

const initialState: PracticeState = {
  currentTask: '',
  completedTasks: [],
  score: 0
};

const practiceSlice = createSlice({
  name: 'practice',
  initialState,
  reducers: {
    setCurrentTask: (state, action: PayloadAction<string>) => {
      state.currentTask = action.payload;
    },
    completeTask: (state, action: PayloadAction<string>) => {
      state.completedTasks.push(action.payload);
      state.score += 10;
    }
  }
});

export const { setCurrentTask, completeTask } = practiceSlice.actions;
export default practiceSlice.reducer;