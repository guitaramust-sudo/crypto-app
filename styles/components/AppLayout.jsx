import AppHeader from './AppHeader';
import AppSider from './AppSider';
import AppContent from './AppContent';
import AppFooter from './AppFooter';
import { useContext } from 'react';
import CryptoContext from '../context/crypto-context';
import { Spin } from 'antd';
import { Layout } from 'antd';


export default function AppLayout() {
    const {loading} = useContext(CryptoContext)

    if (loading) {
        return <Spin fullscreen/>
    }

    return (
    <Layout>
      <AppHeader></AppHeader>
      <Layout>
        <AppSider></AppSider>
        <AppContent></AppContent>
      </Layout>
      <AppFooter></AppFooter>
    </Layout>
    )
}