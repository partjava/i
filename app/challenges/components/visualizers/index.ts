import type { ComponentType } from 'react';
import { findBasicKnowledgeVisualizer } from './basic-knowledge';
import { findPythonProgrammingVisualizer } from './python-programming';
import { findMathFoundationVisualizer } from './math-foundation';
import { findMachineLearningVisualizer } from './machine-learning';
import { findDeepLearningVisualizer } from './deep-learning';
import { findComputerVisionVisualizer } from './computer-vision';
import { findNlpVisualizer } from './nlp';
import { findLlmVisualizer } from './llm';
import { findRlVisualizer } from './rl';
import { findEngineeringDeploymentVisualizer } from './engineering-deployment';
import { findProjectVisualizer } from './project';

export function findChallengeVisualizer(
  stageId: number,
  subtopicName: string,
  levelTitle?: string,
  levelIndex?: number
): ComponentType | null {
  switch (stageId) {
    case 1:
      return findBasicKnowledgeVisualizer(subtopicName, levelTitle, levelIndex);
    case 2:
      return findPythonProgrammingVisualizer(subtopicName, levelTitle, levelIndex);
    case 3:
      return findMathFoundationVisualizer(subtopicName, levelTitle, levelIndex);
    case 4:
      return findMachineLearningVisualizer(subtopicName, levelTitle, levelIndex);
    case 5:
      return findDeepLearningVisualizer(subtopicName, levelTitle, levelIndex);
    case 6:
      return findComputerVisionVisualizer(subtopicName, levelTitle, levelIndex);
    case 7:
      return findNlpVisualizer(subtopicName, levelTitle, levelIndex);
    case 8:
      return findLlmVisualizer(subtopicName, levelTitle, levelIndex);
    case 9:
      return findRlVisualizer(subtopicName, levelTitle, levelIndex);
    case 10:
      return findEngineeringDeploymentVisualizer(subtopicName, levelTitle, levelIndex);
    case 11:
      return findProjectVisualizer(subtopicName, levelTitle, levelIndex);
    default:
      return null;
  }
}
