export enum RiddleType {
  All = 'All',
  Logic = 'Logic',
  Programming = 'Programming',
  WhatAmI = 'What Am I?',
  Kids = 'Kids'
}

export enum RiddleDataType {
  Text = 'Text',
  Img = 'Img',
  MP4 = 'MP4'
}

export interface Riddle {
  id: string;
  title: string;
  author: string;
  date: string;
  type: RiddleType;
  data: string;
  dataType: RiddleDataType;
}
