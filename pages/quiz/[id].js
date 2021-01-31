/* eslint-disable react/prop-types */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/screens/Quiz';

export default function QuizDaGaleraPage({ externalDb }) {
  return (
    <ThemeProvider theme={externalDb.theme}>
      <QuizScreen
        externalQuestions={externalDb.questions}
        externalBg={externalDb.bg}
      />
    </ThemeProvider>

  // {/* <pre style={{ color: 'black' }}>
  //   {JSON.stringify(externalDb.questions, null, 4)}
  // </pre> */}
  );
}

/** Server-side rendering */
export async function getServerSideProps(context) {
  const [projectName, githubUser] = context.query.id.split('___');

  try {
    const externalDb = await fetch(`https://${projectName}.${githubUser}.vercel.app/api/db`)
      .then((respostaDoServer) => {
        if (respostaDoServer.ok) {
          return respostaDoServer.json();
        }
        throw new Error('Fail to get data');
      })
      .then((respostaConvertidaEmObjeto) => respostaConvertidaEmObjeto)
      .catch((err) => {
        console.error(err);
      });

    console.log('externalDb', externalDb);

    return {
      props: {
        externalDb,
      },
    };
  } catch (err) {
    throw new Error(err);
  }
}
