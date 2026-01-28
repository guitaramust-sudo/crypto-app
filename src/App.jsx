import { DatePicker } from 'antd';
import { Layout } from 'antd';

import { CryptoContextProvider} from '../styles/context/crypto-context';
import AppLayout from '../styles/components/AppLayout';

const { Header, Footer, Sider, Content } = Layout;




function App() {
  return (
    <CryptoContextProvider>
      <AppLayout></AppLayout>
    </CryptoContextProvider>
  )
}

export default App
