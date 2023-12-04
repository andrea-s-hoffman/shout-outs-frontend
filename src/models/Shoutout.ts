export default interface Shoutout {
  _id?: string;
  to: string;
  from: string;
  text: string;
  photoURL?: string; // profile img of the sender
  shoutoutImg?: string; // file upload
}
