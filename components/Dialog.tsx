import Image from 'next/image';
import { useState } from 'react';

import styles from '../styles/Header.module.scss';

export default function Dialog({ returnShowDialog }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [post, setPost] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name,
      email,
      phone,
      post,
    };
    console.log(data);
    alert('Data sent to console.');
  };

  return (
    <div className={styles.background}>
      <div className={styles.dialog}>
        <div className={styles.close}>
          <button type="button" onClick={() => returnShowDialog(false)}>
            <Image src="/Close.svg" alt="close" width={28} height={28} />
          </button>
        </div>

        <h1>Contact</h1>

        <form>
          <div>
            <span>Name</span>
            <input type="text" placeholder="Fill your full name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div>
            <span>E-mail</span>
            <input type="email" placeholder="Fill a valid e-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div>
            <span>Phone</span>
            <input type="phone" placeholder="Fill your phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>

          <div>
            <span>Post</span>
            <textarea placeholder="Hello..." value={post} onChange={(e) => setPost(e.target.value)} />
          </div>

          <div>
            <button type="button" onClick={handleSubmit}>
              <div>
                <Image src="/Send.svg" alt="Submit" width={24} height={24} />
                Submit
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
