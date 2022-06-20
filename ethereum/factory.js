import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x694858cc09CF968e6A7888ac90b28607Ea6E478E'
);

export default instance;