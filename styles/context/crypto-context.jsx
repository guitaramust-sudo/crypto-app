import { createContext, useState, useEffect } from "react";
import { fetchCrypto, fetchAssets } from '../../src/api';
import { percentDifference } from "../../src/utils";

const CryptoContext = createContext({
    assets: [],
    crypto: [],
    loading: false,
})



export function CryptoContextProvider({children}) {
    const [loading, setLoading] = useState(false)
    const [crypto, setCrypto] = useState([])
    const [assets, setAssets] = useState([])

    function mapAssets(assets, result) {
        return assets.map((asset) => {
        const coin = result.find(c => c.id == asset.id)
        return {
            grow: asset.price < coin.price,
            growPercent: percentDifference(asset.price, coin.price),
            totalAmount: asset.amount * coin.price,
            totalProfit: +(asset.amount*coin.price - asset.amount * asset.price) == -0.00 ? 0 : +(asset.amount*coin.price - asset.amount * asset.price) ,
            name: coin.name,
            ...asset
        }
    })
    }

    const addAsset = (newAsset) => {
        setAssets(prev => mapAssets([...prev, newAsset], crypto))
    }


    useEffect(() => {
        async function preload() {
            setLoading(true)
            const { result } = await fetchCrypto()
            const assets = await fetchAssets() 

            setAssets(
                mapAssets(assets, result)
            )

            setCrypto(result)

            setLoading(false)
        }
        preload()
    }, [] )


    return <CryptoContext.Provider value = {{loading, assets, crypto, addAsset}}>
        {children}
    </CryptoContext.Provider>
}

export default CryptoContext