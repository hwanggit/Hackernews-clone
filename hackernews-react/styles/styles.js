import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: "rgb(246,246,239)",
    },

    authContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: "rgb(246,246,239)",
        paddingTop: 20,
    },
    
    authInput: {
        flex: 0.2,
        width: '50%'
    },

    authButtonsBefore: {
        flex: 0.2,
        width: '50%',
    },

    authButtonsAfter: {
        flex: 0.2,
        width: '50%',
        marginTop: 60,
    },

    authText: {
        fontSize: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#ff6600',
        marginTop: 30,
    },
    
    authTextError: {
        fontSize: 12,
        paddingBottom: 15,
        color: '#ff6600',
        fontWeight: 'bold'
    },

    authTextSubmit: {
        color: 'white'
    },

    authTextSecond: {
        fontSize: 12,
    },

    authSubmit: {
        backgroundColor:'#ff6600',
        width: 90,
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 10
    },

    navbar: {
        flex: 1,
        flexDirection:'row',
        justifyContent: 'center'
    },

    header: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 16,
    }, 

    header2: {
        fontSize: 16,
        color: 'white',
    },

    postButton: {
        marginLeft: 35
    },

    scrollView: {
        flex: 1,
    },

    post: {
        padding: 10,
    },

    postUrl: {
        textDecorationLine: 'underline'
    },

    postText: {
        fontWeight: "500"
    },

    submit: {
        backgroundColor:'#ff6600',
        width: 100,
        padding: 10,
        alignItems: 'center',
        borderRadius: 5
    },

    inputs: {
        flex: 0.5,
        alignItems: 'center',
        marginTop: '5%',
        width: '90%',
    },

    createLinkDesc: {
        flex: 0.9,
        borderWidth: 1,
        borderColor: 'black',
        width: '100%',
        textAlignVertical:'top',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
    },

    createLinkUrl: {
        flex: 0.15,
        borderWidth: 1,
        borderColor: 'black',
        width: '100%',
        textAlign: 'left',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5
    }
});