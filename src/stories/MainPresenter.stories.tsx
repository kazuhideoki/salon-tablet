import React from 'react';
import { PMainPresenter } from '../app/View/Main/PMain';
import { sampleData } from './SampleData';
export default {
  title: "Main/PMain",
  component: PMainPresenter,
};

const props = {
  appState: {
    isSetting: true,
  },
  articles: sampleData,
  handleOnUpDate: null,
  handleOnDelete: null,
  classes: null,
};

export const Normal = () => {

  return (
    //@ts-ignore
    <PMainPresenter {...props}/>
  )
}