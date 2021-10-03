import React from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import s from './Loader.module.css';

export default function LoaderSpinner() {
  return (
    <div className={s.Loader}>
      <Loader
        type="ThreeDots"
        color="#FF00FF"
        height={80}
        width={80}
        timeout={5000}
      />
    </div>
  );
}
