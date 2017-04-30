package com.cqut.xiji.service.fileEncrypt;

public interface IFileEncryptService {

	public boolean encryptPath(String path, String fileID); //加密文件路径

	public String decryptPath(String path, String password); // 解密字符串

	public boolean encryptFile(String sourcepath, String goalPanth,
			String fileID); //加密文件

	public boolean decryptFile(String sourcepath, String goalPanth,
			String fileID); //解密文件
	public String getFileDecryPath(String fileID); //得到解密后的文件路径
}
