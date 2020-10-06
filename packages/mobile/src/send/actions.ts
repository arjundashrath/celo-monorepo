import BigNumber from 'bignumber.js'
import { InviteBy } from 'src/invite/actions'
import { Recipient } from 'src/recipients/recipient'
import { TransactionDataInput } from 'src/send/SendAmount'
import { Svg } from 'svgs'

export interface QrCode {
  type: string
  data: string
}

export type SVG = typeof Svg

export enum Actions {
  STORE_LATEST_IN_RECENTS = 'SEND/STORE_LATEST_IN_RECENTS',
  BARCODE_DETECTED = 'SEND/BARCODE_DETECTED',
  QRCODE_SHARE = 'SEND/QRCODE_SHARE',
  SEND_PAYMENT_OR_INVITE = 'SEND/SEND_PAYMENT_OR_INVITE',
  SEND_PAYMENT_OR_INVITE_SUCCESS = 'SEND/SEND_PAYMENT_OR_INVITE_SUCCESS',
  SEND_PAYMENT_OR_INVITE_FAILURE = 'SEND/SEND_PAYMENT_OR_INVITE_FAILURE',
  SEND_SIGNED_TXN = 'SEND/SEND_SIGNED_TXN',
}

export interface HandleBarcodeDetectedAction {
  type: Actions.BARCODE_DETECTED
  data: QrCode
  scanIsForSecureSend?: true
  transactionData?: TransactionDataInput
  isOutgoingPaymentRequest?: true
  requesterAddress?: string
}

export interface ShareQRCodeAction {
  type: Actions.QRCODE_SHARE
  qrCodeSvg: SVG
}

export interface StoreLatestInRecentsAction {
  type: Actions.STORE_LATEST_IN_RECENTS
  recipient: Recipient
}

export interface SendPaymentOrInviteAction {
  type: Actions.SEND_PAYMENT_OR_INVITE
  amount: BigNumber
  comment: string
  recipient: Recipient
  recipientAddress?: string | null
  inviteMethod?: InviteBy
  firebasePendingRequestUid: string | null | undefined
}

export interface SendSignedTxAction {
  type: Actions.SEND_SIGNED_TXN
  rawTx: string
}

export interface SendPaymentOrInviteSuccessAction {
  type: Actions.SEND_PAYMENT_OR_INVITE_SUCCESS
  amount: BigNumber
}

export interface SendPaymentOrInviteFailureAction {
  type: Actions.SEND_PAYMENT_OR_INVITE_FAILURE
}

export type ActionTypes =
  | HandleBarcodeDetectedAction
  | ShareQRCodeAction
  | StoreLatestInRecentsAction
  | SendPaymentOrInviteAction
  | SendPaymentOrInviteSuccessAction
  | SendPaymentOrInviteFailureAction
  | SendSignedTxAction

export const storeLatestInRecents = (recipient: Recipient): StoreLatestInRecentsAction => ({
  type: Actions.STORE_LATEST_IN_RECENTS,
  recipient,
})

export const handleBarcodeDetected = (
  data: QrCode,
  scanIsForSecureSend?: true,
  transactionData?: TransactionDataInput,
  isOutgoingPaymentRequest?: true,
  requesterAddress?: string
): HandleBarcodeDetectedAction => ({
  type: Actions.BARCODE_DETECTED,
  data,
  scanIsForSecureSend,
  transactionData,
  isOutgoingPaymentRequest,
  requesterAddress,
})

export const shareQRCode = (qrCodeSvg: SVG): ShareQRCodeAction => ({
  type: Actions.QRCODE_SHARE,
  qrCodeSvg,
})

export const sendPaymentOrInvite = (
  amount: BigNumber,
  comment: string,
  recipient: Recipient,
  recipientAddress: string | null | undefined,
  inviteMethod: InviteBy | undefined,
  firebasePendingRequestUid: string | null | undefined
): SendPaymentOrInviteAction => ({
  type: Actions.SEND_PAYMENT_OR_INVITE,
  amount,
  comment,
  recipient,
  recipientAddress,
  inviteMethod,
  firebasePendingRequestUid,
})

export const sendSignedTxn = (rawTx: string): SendSignedTxAction => ({
  type: Actions.SEND_SIGNED_TXN,
  rawTx,
})

export const sendPaymentOrInviteSuccess = (
  amount: BigNumber
): SendPaymentOrInviteSuccessAction => ({
  type: Actions.SEND_PAYMENT_OR_INVITE_SUCCESS,
  amount,
})

export const sendPaymentOrInviteFailure = (): SendPaymentOrInviteFailureAction => ({
  type: Actions.SEND_PAYMENT_OR_INVITE_FAILURE,
})
