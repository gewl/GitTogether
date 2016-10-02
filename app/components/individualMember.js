import React from 'react';
import styles from './individualMember.scss';
import { Link } from 'react-router';

console.log("styles repo", styles)

const iconArray = [ 'glyphicon glyphicon-book', 'glyphicon glyphicon-print', 'glyphicon glyphicon-camera' ];

export default function IndividualMember(props) {
  return (
    <div className={styles.flex}>
      <div className={[styles.pic, 'grey'].join(" ")}>

        <span className={iconArray[Math.floor(Math.random()*3)]}></span>

      </div> {/* pic */}

      <div className={[styles.name, 'purple'].join(" ")}>

        <span>{props.name}</span>

      </div> {/* name */}

      <div className={[styles.id, 'pink'].join(" ")}>

        <span>{props.id}</span>

      </div> {/* id */}

      <div className={[styles.delete, 'blue'].join(" ")}>
        <Link className="dark button" to="/">
          <div onClick={props.delete} className='glyphicon glyphicon-trash'></div>
        </Link>

      </div> {/* delete */}
    </div>
  )
}
