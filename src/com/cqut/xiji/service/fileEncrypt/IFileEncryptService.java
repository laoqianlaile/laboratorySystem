package com.cqut.xiji.service.fileEncrypt;

public interface IFileEncryptService {

	public boolean encryptPath(String path, String iD);

	public String decryptPath(String path, String password);

	public boolean encryptFile(String sourcepath, String goalPanth,
			String fileID);

	public boolean decryptFile(String sourcepath, String goalPanth,
			String fileID);
}
