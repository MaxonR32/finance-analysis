import {Injectable} from '@angular/core';
import {Subscription, gql} from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class NewPostGQL extends Subscription {
  document = gql`
    subscription  {
		getListLive {
			quantityMoney
			profit
			date
			comment 
			member
			memberName
		}
	}
  `;
}

