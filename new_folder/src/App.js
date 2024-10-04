import logo from './logo.svg';
import './App.css';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal, MsalProvider} from '@azure/msal-react';
import { loginRequest } from './auth-config';


const WrappedView = () =>{
    const {instance } = useMsal();
    const activeAccount = instance.getActiveAccount();

    const handleRedirect = () =>{
      instance.loginRedirect({
        ...loginRequest,
        prompt: 'create',
      }).catch((error) => console.log(error))
    };

    return (
      <div className='App'>
        <AuthenticatedTemplate>
          {activeAccount ? (
            <p>
              Authenticated successfully
            </p>
          ): null }
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <button onClick={handleRedirect}>
            Sign Up
          </button>
        </UnauthenticatedTemplate>
      </div>
    );


}

const App = ({ instance }) => {
  return (
    <MsalProvider instance={instance}>
      < WrappedView/>
    </MsalProvider>
  );
};

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
