/* eslint-disable class-methods-use-this */

let Cast = window.chrome.cast;

export default class CastSender {
  constructor() {
    this.applicationID = '99EC3986';
    this.namespace = 'urn:x-cast:ch.imakethings.hydra-receiver';

    this.session = null;
    Cast = window.chrome.cast;

    this._initializeCastApi();
  }

  stop() {
    this.session.stop();
  }

  async requestSession() {
    return new Promise((resolve, reject) => {
      Cast.requestSession((session) => {
        this.session = session;
        resolve(session);
      }, reject);
    });
  }

  sendMessage(message) {
    if (this.session != null) {
      this.session.sendMessage(this.namespace, message, this._onSuccess, this.onError);
    }
  }

  _initializeCastApi() {
    const sessionRequest = new Cast.SessionRequest(this.applicationID);
    const apiConfig = new Cast.ApiConfig(sessionRequest, this._sessionListener, this._receiverListener);

    Cast.initialize(apiConfig, this._onInitSuccess, this._onError);
  }

  _sessionListener(message) {
    console.log(message);
  }

  _receiverListener(message) {
    console.log(message);
  }

  _onInitSuccess(message) {
    console.log(message);
  }

  _onSuccess(message) {
    console.log(message);
  }

  _onError(message) {
    console.log(message);
  }
}
