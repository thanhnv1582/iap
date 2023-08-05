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

const itemsProducts: any = Platform.select({
    ios: [],
    android: ['thanh_nguyen_1582v3', 'com.thanhnguyen1582iap'],
});

const itemsSubscriptions: any = Platform.select({
    ios: [],
    android: ['thanh_nguyen_1582v2', 'thanh_nguyen_1582'],
});

let purchaseUpdateSubscription;
let purchaseErrorSubscription;

function App(): JSX.Element {
    const [purchased, setPurchased] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        IAP.initConnection().then(() => {
            IAP.getProducts({ skus: itemsProducts })
                .then((res) => {
                    setProducts(res);
                })
                .catch(() => {
                    throw new Error('NO ACTION');
                });
        });

        // purchaseErrorSubscription = IAP.purchaseErrorListener((error) => {
        //     if (Number(error['responseCode']) === 2) {
        //         Alert.alert(
        //             'Error',
        //             'There has been an error with your purchase, error code' + error['code'],
        //         );
        //     }
        // });

        // purchaseUpdateSubscription = IAP.purchaseUpdatedListener((purchase) => {
        //     setPurchased(true);
        // });

        // return () => {
        //     try {
        //         purchaseUpdateSubscription.remove();
        //     } catch (error) {}

        //     try {
        //         purchaseErrorSubscription.remove();
        //     } catch (error) {}

        //     try {
        //         IAP.endConnection();
        //     } catch (error) {}
        // };
    }, []);

    console.log('----------------------------');
    console.log(products);
    console.log('----------------------------');

    if (products.length > 0) {
        return (
            <View style={styles.container}>
                {products.map((p) => (
                    <Button
                        title={`Purchase ${p['localizedPrice']}`}
                        key={p['productId']}
                        onPress={() => IAP.requestSubscription(p['productId'])}
                    />
                ))}
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.contentText}>Fetching Products please wait...</Text>
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
