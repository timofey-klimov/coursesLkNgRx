import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IAppState } from "src/app/shared/types/app.state";
import { ITeacherStudentsState } from "./teacher-students.state";

export const featureSelector = createFeatureSelector<IAppState,ITeacherStudentsState>('teacherStudents');

export const isLoadingSelector = createSelector(featureSelector, (state) => state.isLoading);

export const studentsSelector = createSelector(featureSelector, (state) => state.students);

export const studentInfoLoadingSelector = createSelector(featureSelector, (state) => state.studentInfo?.isLoading);

export const studentInfoSelector = createSelector(featureSelector, (state) => state.studentInfo?.student);

export const wasErrorInStudentInfoSelector = createSelector(featureSelector, (state) => state.studentInfo?.wasError);
