import $ from 'jquery';
import ID from './cred';

let base_url = 'https://api.soundcloud.com/';

export default function retrieve(query){
    return $.ajax({
        url: base_url + 'tracks',
        data: {
            q: query,
            client_id: ID
        }
    });
};
