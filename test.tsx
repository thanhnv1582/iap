/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { withIAPContext, requestPurchase, useIAP } from 'react-native-iap';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert, Button, Platform } from 'react-native';

import * as IAP from 'react-native-iap';

const items: any = Platform.select({
    ios: ['com.thanhnguyen1582iap'],
    android: ['thanh_nguyen_1582v2', 'com.thanhnguyen1582iap'],
});

const itemsProducts: any = Platform.select({
    ios: [],
    android: ['thanh_nguyen_1582v3', 'com.thanhnguyen1582iap'],
});

const itemsSubscriptions: any = Platform.select({
    ios: [],
    android: ['thanh_nguyen_1582v2', 'thanh_nguyen_1582'],
});

function App(): JSX.Element {
    const {
        connected,
        products,
        promotedProductsIOS,
        subscriptions,
        availablePurchases,
        currentPurchase,
        currentPurchaseError,
        initConnectionError,
        finishTransaction,
        getProducts,
        getSubscriptions,
        getAvailablePurchases,
    } = useIAP();

    const getProductsAndPurchases = async () => {
        getProducts({ skus: itemsProducts });
        getSubscriptions({ skus: itemsSubscriptions });
    };

    const handlePurchase = async (sku: string) => {
        await requestPurchase({ sku });
    };

    useEffect(() => {
        // ... listen to currentPurchaseError, to check if any error happened
    }, [currentPurchaseError]);

    useEffect(() => {
        // ... listen to currentPurchase, to check if the purchase went through
    }, [currentPurchase]);

    useEffect(() => {
        if (connected) {
            getProductsAndPurchases();
        }
    }, [connected]);

    console.log('--------------');
    console.log(products);
    console.log(subscriptions);
    console.log('--------------');

    return (
        <View style={styles.container}>
            <Text style={styles.contentText}>Dogs are cool</Text>
            <Button
                title="Get the products"
                onPress={async () => {
                    getProducts({ skus: ['thanh_nguyen_1582v3'] });
                }}
            />

            {products.map((product) => (
                <View key={product.productId}>
                    <Text>{product.productId}</Text>

                    <Button title="Buy" onPress={() => handlePurchase(product.productId)} />
                </View>
            ))}
        </View>
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
});

export default withIAPContext(App);
