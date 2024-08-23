import { Injectable } from '@angular/core';
import { TenderDetails } from '../models/tender-details.model';

@Injectable()
export class TenderDetailsConverterService {
  convertToDisplayFormat(tenderDetails: TenderDetails): { [key: string]: string | number } {
    return {
      'Tender ID': tenderDetails.TenderID,
      'Tender Name': tenderDetails.TenderName,
      'Tender Model': tenderDetails.TenderModel,
      'Created By': tenderDetails.CreatedBy,
      'Created On': tenderDetails.CreatedOn,
      'Invited Participants': tenderDetails.InvitedParticipants,
      'Participated': tenderDetails.Participated,
      'Not Submitted': tenderDetails.NotSubmitted,
      'Rejected Tender': tenderDetails.RejectedTender,
      'Product Count': tenderDetails.RroductCount,
      'Committee Members': tenderDetails.CommitteeMembers,
      'Completed Date': tenderDetails.CompletedDate
    };
  }
}