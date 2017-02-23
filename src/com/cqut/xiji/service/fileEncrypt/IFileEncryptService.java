package com.cqut.xiji.service.fileEncrypt;

public interface IFileEncryptService {

	boolean encryptPath(String path, String iD);

	String decryptPath(String path, String password);

}
