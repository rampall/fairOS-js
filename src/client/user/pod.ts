import {
  PodClose,
  PodDelete,
  PodNew,
  PodOpen,
  PodPresent,
  PodReceiveInfo,
  PodReceive,
  PodShare,
  PodStat,
  PodSync,
  PodModel,
} from "../../internal";

export class UserPod extends PodModel {
  /**
   * shows the pod info of the pod that is to be received
   */
  podReceiveInfo({ reference }: PodReceiveInfo) {
    return super.podReceiveInfo({ reference });
  }

  /**
   * make a pod public and share it with others
   */
  podReceive({ reference }: PodReceive) {
    return super.podReceive({ reference });
  }

  /**
   * create a new pod
   */
  podNew({ pod_name, password }: PodNew) {
    return super.podNew({
      pod_name,
      password,
    });
  }

  /**
   * Opens a pod
   */
  podOpen({ pod_name, password }: PodOpen) {
    return super.podOpen({
      pod_name,
      password,
    });
  }

  /**
   * Closes a pod
   */
  podClose({ pod_name }: PodClose) {
    return super.podClose({
      pod_name,
    });
  }

  /**
   * Syncs the latest contents of the pod from Swarm
   */
  podSync({ pod_name }: PodSync) {
    return super.podSync({
      pod_name,
    });
  }

  /**
   * Shared a pod
   */
  podShare({ pod_name, password }: PodShare) {
    return super.podShare({
      pod_name,
      password,
    });
  }

  /**
   * Deletes a pod
   */
  podDelete({ pod_name, password }: PodDelete) {
    return super.podDelete({
      pod_name,
      password,
    });
  }

  /**
   * Lists all pods of a user
   */
  podList() {
    return super.podList();
  }

  /**
   * Show all the information about a pod
   */
  podStat({ pod_name }: PodStat) {
    return super.podStat({
      pod_name,
    });
  }

  /**
   * Is Pod present
   */
  podPresent({ pod_name }: PodPresent) {
    return super.podPresent({
      pod_name,
    });
  }
}
