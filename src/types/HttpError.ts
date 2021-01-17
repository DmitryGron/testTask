import { AxiosError } from 'axios';

export type HttpError<T = any> = AxiosError<T> & { isOngoingRedirect: boolean };
