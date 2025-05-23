import { useEffect, useReducer } from "react";
import Header from "./components/Header"
import Main from "./components/Main"
import Loader from "./components/Loader"
import Error from "./components/Error"
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";

const initialState = {
  questions: [],
  // 'loading', 'error', 'ready', 'active', 'finished'
  status: 'loading',
  index: 0,
  answer: null,
  points: 0
};

function reducer(state, action) {
  switch(action.type) {
    case 'dataReceived':
      return {...state, 
        questions: action.payload,
        status: 'ready'
      }
    case 'dataFailed':
      return {...state, 
        status: "error"
      }
    case 'start':
      return {...state, 
        status: "active"
      }
    case 'newAnswer':
      const question = state.questions.at(state.index)
      
      return {
        ...state,
        answer: action.payload,
        points: action.payload === question.correctOption 
        ? state.points + question.points 
        : state.points
      }
    default:
      throw new Error("Action unknown")
  }
}

function App() {
  const [{questions, status, index, answer}, dispatch] = useReducer(reducer, initialState)

  useEffect(
    function() {
      fetch("http://localhost:8000/questions")
        .then((res)=>res.json())
        .then((data)=>dispatch({type: 'dataReceived', payload: data}))
        .catch((err)=>dispatch({type: 'dataFailed'}));
    }, []);

    // handlers
    function handleActive() {
      dispatch({type: 'start'})
    }

  return (
    <div className="app">
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen numQuestions={questions.length} handleActive={handleActive}/>}
        {status === 'active' && <Question question={questions[index]} dispatch={dispatch} answer={answer}/>}
      </Main>
    </div>
  );
}

export default App;
