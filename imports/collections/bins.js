import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

Meteor.methods({
    'bins.insertAsync': async function () {
        return await Bins.insertAsync({
            createdAt: new Date(),
            content: '',
            sharedWith: [],
            ownerId: this.userId,
        });
    },

    'bins.removeAsync': async function (bin) {
        return await Bins.removeAsync(bin);
    },

    'bins.updateAsync': async function (binId, newContent) {
        try {
            if (typeof newContent !== 'object') {
                throw new Meteor.Error('400', 'newContent debe ser un objeto');
            }
            console.log(`Actualizando bin con ID: ${binId}`);
            console.log(`Nuevos contenidos: ${JSON.stringify(newContent)}`);
            const result = await Bins.updateAsync(binId, { $set:{content: newContent} });
            console.log(`Resultado de la actualización: ${result}`);
            if (result === 0) {
                throw new Meteor.Error('404', 'No se encontró el bin o no se realizó ninguna actualización');
            }
            return result;
        } catch (error) {
            console.error(`Error actualizando bin: ${error.message}`);
            throw new Meteor.Error('500', `Error actualizando bin: ${error.message}`);
        }
    },

    'bins.shareAsync': async function (bin, email) {
        if (!bin || !bin._id) {
            console.error('Invalid bin object:', bin);
            throw new Error('Invalid bin object');
        }

        console.log(bin);
        return await Bins.updateAsync(bin._id, { $push: { sharedWith: email } });
    }

})

export const Bins = new Mongo.Collection('bins');
