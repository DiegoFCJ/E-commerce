package com.nuraghenexus.officeoasis.repository;

import com.nuraghenexus.officeoasis.model.PurchaseHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PurchaseHistoryRepository extends JpaRepository<PurchaseHistory, Long> {
}
