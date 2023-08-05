/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert, Button, Platform, Pressable } from 'react-native';
import {
    initConnection,
    endConnection,
    withIAPContext,
    purchaseErrorListener,
    purchaseUpdatedListener,
    type ProductPurchase,
    type PurchaseError,
    flushFailedPurchasesCachedAsPendingAndroid,
    getProducts,
    requestPurchase,
} from 'react-native-iap';

const itemsProducts: any = Platform.select({
    ios: [],
    android: ['thanh_nguyen_1582v3', 'thanhnguyen1582v4'],
});

const itemSubs: any = Platform.select({
    ios: [],
    android: ['thanh_nguyen_1582v2', 'thanh_nguyen_1582'],
});

function App(): JSX.Element {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        initConnection()
            .catch(() => {
                throw new Error('CONNECT ERROR');
            })
            .then(() => {
                getProducts({ skus: itemsProducts })
                    .catch(() => {
                        throw new Error('CATCH A ERROR WHEN GET PRODUCT');
                    })
                    .then((p) => {
                        setProducts(p);
                    });
            });
    }, []);

    const componentWillUnmount = () => {
        endConnection();
    };

    const handlePurchase = async (sku: any) => {
        console.log('---------------');
        console.log(sku.productId);
        await requestPurchase({ skus: [sku.productId] }).then((res: any) => {
            console.log('-------------------');
            console.log(sku);
            console.log(res);
            console.log('-------------------');
        });
    };

    return (
        <>
            {products.map((p, i) => {
                return (
                    <Pressable
                        key={i}
                        style={styles.productContainer}
                        onPress={() => handlePurchase(p)}
                    >
                        <Text>{p['localizedPrice']}</Text>
                    </Pressable>
                );
            })}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentText: {
        color: 'black',
    },
    productContainer: {
        backgroundColor: 'black',
        paddingRight: 30,
        paddingLeft: 30,
        paddingBottom: 10,
        paddingTop: 10,
        borderRadius: 6,
        marginTop: 30,
    },
});

export default withIAPContext(App);
